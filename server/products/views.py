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
from django.db.models import Sum, Q
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.units import inch
from rest_framework.views import APIView
from datetime import datetime


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

        products = Product.objects.annotate(
            total_in=Sum(
                "movements__quantity", filter=Q(movements__movement_type="in")
            ),
            total_out=Sum(
                "movements__quantity", filter=Q(movements__movement_type="out")
            ),
        ).order_by("category", "name")

        data = [
            [
                "Código",
                "Nome",
                "Categoria",
                "Estoque Atual",
                "Mínimo",
                "Entradas",
                "Saídas",
                "Status",
            ]
        ]

        for product in products:
            stock_status = product.stock_status
            status_display = {
                "out_of_stock": "ESGOTADO",
                "low_stock": "BAIXO",
                "in_stock": "OK",
            }.get(stock_status, "OK")

            data.append(
                [
                    product.code,
                    product.name,
                    product.category,
                    str(product.current_stock),
                    str(product.minimum_stock),
                    str(product.total_in or 0),
                    str(product.total_out or 0),
                    status_display,
                ]
            )

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = (
            f'attachment; filename="relatorio_estoque_{datetime.now().date()}.pdf"'
        )

        doc = SimpleDocTemplate(
            response,
            pagesize=letter,
            rightMargin=30,
            leftMargin=30,
            topMargin=30,
            bottomMargin=18,
        )
        elements = []
        styles = getSampleStyleSheet()

        title = Paragraph(f"Relatório de Estoque - {report_date}", styles["Title"])
        elements.append(title)
        elements.append(Spacer(1, 0.25 * inch))

        table = Table(data)
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#4472C4")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, 0), 10),
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

        total_products = len(data) - 1
        out_of_stock = sum(1 for row in data[1:] if row[-1] == "ESGOTADO")
        low_stock = sum(1 for row in data[1:] if row[-1] == "BAIXO")

        footer_text = f"""
        <b>Resumo:</b> {total_products} produtos | 
        <font color='red'>ESGOTADO: {out_of_stock}</font> | 
        <font color='orange'>BAIXO: {low_stock}</font>
        """
        footer = Paragraph(footer_text, styles["Normal"])
        elements.append(Spacer(1, 0.25 * inch))
        elements.append(footer)

        doc.build(elements)
        return response
