from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProductSerializer, StockMovementSerializer
from .models import Product, StockMovement
from users.permissions import (
    IsAdminOrManagerOrOperator,
)
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.units import inch
from rest_framework.views import APIView
from datetime import datetime
from reportlab.lib.pagesizes import landscape


class ProductListCreateView(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminOrManagerOrOperator()]
        return [IsAuthenticated()]


class ProductRetrieveView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_url_kwarg = "product_id"

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH"]:
            return [IsAdminOrManagerOrOperator()]
        elif self.request.method == "DELETE":
            return [IsAdminUser()]
        return [IsAuthenticated()]


class StockMovementListCreateView(ListCreateAPIView):
    serializer_class = StockMovementSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminOrManagerOrOperator()]
        return [IsAuthenticated()]

    def get_queryset(self):
        product_id = self.request.query_params.get("product_id")
        if product_id:
            return StockMovement.objects.filter(product_id=product_id)
        return StockMovement.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        product = instance.product
        stock_warning = None

        if product.current_stock <= product.minimum_stock:
            stock_warning = {
                "alert": "low_stock",
                "message": f"O produto {product.name} atingiu o estoque mínimo",
                "current_stock": product.current_stock,
                "minimum_stock": product.minimum_stock,
            }

        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data

        if stock_warning:
            response_data["warning"] = stock_warning

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()


class StockReportPDFView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        report_date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

        products = (
            Product.objects.filter(is_active=True)
            .prefetch_related("movements")
            .order_by("category", "name")
        )

        data = [
            [
                "Código",
                "Produto",
                "Categoria",
                "Data Mov.",
                "Tipo",
                "Qnt.",
                "Motivo",
                "Atual",
                "Mínimo",
                "Status",
            ]
        ]

        for product in products:
            product_movements = product.movements.all().order_by("created_at")

            if not product_movements:
                status_display = self.get_status_display(product.stock_status)
                data.append(
                    [
                        product.code,
                        product.name,
                        product.category,
                        "-",
                        "-",
                        "-",
                        "-",
                        str(product.current_stock),
                        str(product.minimum_stock),
                        status_display,
                    ]
                )
            else:
                for movement in product_movements:
                    status_display = self.get_status_display(product.stock_status)

                    data.append(
                        [
                            product.code,
                            product.name,
                            product.category,
                            movement.created_at.strftime("%d/%m/%Y %H:%M"),
                            movement.get_movement_type_display(),
                            str(movement.quantity),
                            movement.reason if movement.reason else "-",
                            str(product.current_stock),
                            str(product.minimum_stock),
                            status_display,
                        ]
                    )

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = (
            f'attachment; filename="relatorio_estoque_detalhado_{datetime.now().date()}.pdf"'
        )

        doc = SimpleDocTemplate(
            response,
            pagesize=landscape(letter),
            rightMargin=30,
            leftMargin=30,
            topMargin=30,
            bottomMargin=18,
        )
        elements = []
        styles = getSampleStyleSheet()

        title = Paragraph(
            f"Relatório de Movimentações de Estoque - {report_date}", styles["Title"]
        )
        elements.append(title)
        elements.append(Spacer(1, 0.25 * inch))

        col_widths = [60, 120, 80, 70, 50, 50, 100, 50, 50, 50]

        table = Table(data, colWidths=col_widths, repeatRows=1)
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#4472C4")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, 0), 9),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#D9E1F2")),
                    ("GRID", (0, 0), (-1, -1), 1, colors.black),
                    ("FONTSIZE", (0, 1), (-1, -1), 8),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ]
            )
        )

        for i, row in enumerate(data[1:], 1):
            if row[-1] == "ESGOTADO":
                table.setStyle(
                    TableStyle(
                        [
                            ("TEXTCOLOR", (0, i), (-1, i), colors.red),
                            ("FONTNAME", (0, i), (-1, i), "Helvetica-Bold"),
                        ]
                    )
                )
            elif row[-1] == "BAIXO":
                table.setStyle(
                    TableStyle(
                        [
                            ("TEXTCOLOR", (0, i), (-1, i), colors.orange),
                        ]
                    )
                )

        elements.append(table)

        unique_products = {row[0] for row in data[1:]}
        total_products = len(unique_products)
        total_movements = len([row for row in data[1:] if row[3] != "-"])
        out_of_stock = len(
            [row for row in data[1:] if row[-1] == "ESGOTADO" and row[3] == "-"]
        )
        low_stock = len(
            [row for row in data[1:] if row[-1] == "BAIXO" and row[3] == "-"]
        )

        footer_text = f"""
        <b>Resumo:</b> {total_products} produtos | {total_movements} movimentações | 
        <font color='red'>ESGOTADO: {out_of_stock}</font> | 
        <font color='orange'>BAIXO: {low_stock}</font>
        """
        footer = Paragraph(footer_text, styles["Normal"])
        elements.append(Spacer(1, 0.25 * inch))
        elements.append(footer)

        doc.build(elements)
        return response

    def get_status_display(self, status):
        return {
            "out_of_stock": "ESGOTADO",
            "low_stock": "BAIXO",
            "in_stock": "OK",
        }.get(status, "OK")
