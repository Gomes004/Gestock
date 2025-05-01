from rest_framework.permissions import BasePermission


class IsAdminOrManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_admin() or request.user.is_manager()
        )


class IsAdminOrManagerOrOperator(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_admin()
            or request.user.is_manager()
            or request.user.is_stock_operator()
        )
