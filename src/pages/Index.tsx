
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Package, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate("/login");
  };

  const handleTour = () => {
    // Por enquanto apenas redireciona para login, podemos implementar um tour depois
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white animate-fadeIn">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center">
            <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-600 rounded-full">
              Versão Beta
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
            Gestock
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Sistema inteligente de gerenciamento de estoque para sua empresa
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card p-6 transition-all hover:translate-y-[-4px] cursor-pointer" onClick={() => navigate("/login")}>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Package className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-zinc-900">Produtos</h3>
                <p className="text-sm text-zinc-600">Gestão completa do catálogo</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 transition-all hover:translate-y-[-4px] cursor-pointer" onClick={() => navigate("/login")}>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-zinc-900">Movimentações</h3>
                <p className="text-sm text-zinc-600">Controle entrada e saída</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 transition-all hover:translate-y-[-4px] cursor-pointer" onClick={() => navigate("/login")}>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-zinc-900">Fornecedores</h3>
                <p className="text-sm text-zinc-600">Gestão de parceiros</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 transition-all hover:translate-y-[-4px] cursor-pointer" onClick={() => navigate("/login")}>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-zinc-900">Relatórios</h3>
                <p className="text-sm text-zinc-600">Análises e insights</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all"
            onClick={handleStartNow}
          >
            Começar Agora
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-all"
            onClick={handleTour}
          >
            Fazer Tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
