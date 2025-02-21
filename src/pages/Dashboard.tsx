
import { Card } from "@/components/ui/card";
import { Package, TrendingUp, Users, BarChart3 } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controle
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 glass-card transition-all hover:translate-y-[-4px]">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Produtos
              </p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass-card transition-all hover:translate-y-[-4px]">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Movimentações
              </p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass-card transition-all hover:translate-y-[-4px]">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Fornecedores
              </p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass-card transition-all hover:translate-y-[-4px]">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Relatórios
              </p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
