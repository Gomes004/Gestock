
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, AlertCircle } from "lucide-react";

// Tipos de usuário que o sistema suporta
type UserRole = "operator" | "manager" | "admin";

interface LoginResponse {
  success: boolean;
  role?: UserRole;
  message?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulação de resposta do backend - será substituída pela integração real
      const mockLoginResponse: LoginResponse = {
        success: true,
        role: "operator",
        message: "Login realizado com sucesso!"
      };

      if (mockLoginResponse.success) {
        // Aqui você irá salvar o token e role retornados pelo backend
        localStorage.setItem("userRole", mockLoginResponse.role || "");
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o sistema...",
        });

        // Redireciona baseado no papel do usuário
        setTimeout(() => {
          switch (mockLoginResponse.role) {
            case "admin":
              navigate("/dashboard");
              break;
            case "manager":
              navigate("/dashboard");
              break;
            case "operator":
              navigate("/home");
              break;
            default:
              navigate("/home");
          }
        }, 1500);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecovering(true);

    try {
      // Aqui você irá integrar com o endpoint que enviará o email via Gmail
      // O backend deverá gerar um token único e enviar um email com um link para redefinição
      
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Verifique seu email (inclusive a pasta de spam) para instruções de recuperação de senha.",
      });

      // Volta para o formulário de login após 3 segundos
      setTimeout(() => {
        setIsRecovering(false);
      }, 3000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao solicitar recuperação",
        description: "Verifique se o email está correto e tente novamente.",
      });
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card animate-fadeIn">
        <CardHeader className="space-y-1 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Gestock</h2>
          <p className="text-sm text-muted-foreground">
            {isRecovering 
              ? "Digite seu email para recuperar sua senha"
              : "Entre com suas credenciais para acessar o sistema"
            }
          </p>
        </CardHeader>
        <CardContent>
          {isRecovering ? (
            // Formulário de recuperação de senha
            <form onSubmit={handlePasswordRecovery} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Digite seu email cadastrado"
                    className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Você receberá um email com instruções para criar uma nova senha.
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-all"
                disabled={isRecovering}
              >
                {isRecovering ? "Enviando..." : "Enviar email de recuperação"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setIsRecovering(false)}
              >
                Voltar ao login
              </Button>
            </form>
          ) : (
            // Formulário de login
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="Senha"
                    className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {!isRecovering && (
            <>
              <div className="text-sm text-muted-foreground text-center">
                <button
                  type="button"
                  onClick={() => setIsRecovering(true)}
                  className="hover:text-emerald-500 transition-colors underline"
                >
                  Esqueceu sua senha?
                </button>
              </div>
              <div className="text-sm text-center">
                <AlertCircle className="inline-block w-4 h-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Entre em contato com o administrador para criar uma nova conta
                </span>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
