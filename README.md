
# 📘 Documentação do Frontend FavMovies

Frontend da aplicação de Trailers de Filmes, desenvolvido em **Angular 19 standalone**.
Este projeto oferece uma interface administrativa para gerenciamento de Filmes e Usuários.
Mais funcionalidades em breve.

Usuários administradores autenticados poderão:
- Visualizar insights sobre comsumo de filmes da plataforma (Visualizações, marcações como Favoritos, Avaliações, etc...)
- Gerenciar filmes e usuários cadastrados
- Editar suas próprias preferências de conta

Usuários comuns ainda não possuem interface finalizada (rota `/movies` em desenvolvimento).

---

## 🔧 Tecnologias

- Angular 19 (standalone components)
- RxJS
- Angular Router
- Angular Forms
- TypeScript
- CSS/Tailwind (opcional)
- JWT (Token via Cookie)
- Interceptors de Autenticação

---

## 📌 Requisitos

- Node.js 18+
- Angular CLI 19+
- API backend rodando em http://localhost:3000

---

## 🚀 Instalação

```bash
git clone https://github.com/seu-usuario/favmovies-frontend.git
cd favmovies-frontend
npm install
```

---

## ▶️ Execução

```bash
ng serve
```

Acesse em: [http://localhost:4200](http://localhost:4200)

---

## 🔐 Autenticação

- Login e Registro são feitos via `/auth/login` e `/auth/register`
- O token JWT é armazenado via cookie pelo backend.
- Navegação é protegida por Guards de autenticação e autorização por `role`.

---

## 🌐 Rotas

| Rota                    | Protegida | Descrição                                                                 |
|-------------------------|-----------|---------------------------------------------------------------------------|
| `/`                     | ❌        | Redireciona para `/login` se não autenticado                             |
| `/login`                | ❌        | Página de autenticação e cadastro                                        |
| `/admin`                | ✅ admin  | Página principal do painel administrativo                                |
| `/admin/dashboard`      | ✅ admin  | Página de insights da plataforma                                         |
| `/admin/movies-management` | ✅ admin | Gerenciamento de filmes (CRUD + busca + paginação)                       |
| `/admin/users-management`  | ✅ admin | Gerenciamento de usuários (promoção/rebaixamento + busca + paginação)    |
| `/admin/user-preferences` | ✅ admin | Preferências da conta (visualização e edição de perfil)                  |
| `/movies`               | ✅ user   | (Em desenvolvimento) Página inicial do usuário comum                     |

---

## 🧩 Funcionalidades

### Login e Cadastro (`/login`)
- Login com email e senha
- Cadastro com nome, email e senha
- Role padrão de novo usuário: `user`

### Painel Administrativo (`/admin`)
- Redirecionamento automático para `/admin/dashboard`
- Menu lateral com 4 seções:
  - **Dashboard**: estatísticas e rankings dos filmes com mais interações
  - **Filmes**: busca, cadastro, edição e exclusão de filmes
  - **Usuários**: busca, promoção e rebaixamento de usuários
  - **Preferências**: edição de nome/email/senha do administrador

### Preferências do Administrador
- Campos desabilitados por padrão
- Ao clicar em “Editar Preferências”, campos ficam editáveis
- A Senha permanece desabilitada até que o usuário desmarque o checkbox “Manter senha atual”
- Ações: **Salvar Alterações** ou **Cancelar**

---

## 📌 Observações Finais

- A interface de usuário comum (`/movies`) será incluída futuramente
- Somente usuários com role `"admin"` têm acesso ao painel `/admin`

---

## 🖼️ Capturas de Tela

### 🔐 Login & Registro

**Estado inicial (botões desativados)**
![Login Inicial](src/assets/screenshots/001_tela_de_login_estado_inicial_botoes_login_register_desativados.png)

**Formulário de login preenchido**
![Login Ativado](src/assets/screenshots/002_tela_de_login_login_form_preenchido_botao_login_ativado.png)

**Formulário de registro preenchido**
![Registro Ativado](src/assets/screenshots/003_tela_de_login_register_form_preenchido_botao_registrar_ativado.png)

---

### 🧭 Painel Admin - Dashboard

**Dashboard após login do admin**
![Dashboard](src/assets/screenshots/004_tela_admin_dashboard_apos_login_do_admin.png)

---

### 🎬 Gerenciamento de Filmes

**Listagem de filmes**
![Movies Management](src/assets/screenshots/005_tela_admin_movies_management.png)

**Busca realizada**
![Busca de Filmes](src/assets/screenshots/006_tela_admin_movies_management_busca_realizada.png)

**Detalhar filme**
![Detalhar Filme](src/assets/screenshots/007_tela_admin_movies_management_detalhar_filme.png)

**Adicionar filme**
![Adicionar Filme](src/assets/screenshots/008_tela_admin_movies_management_adicionar_filme.png)

**Editar filme**
![Editar Filme](src/assets/screenshots/009_tela_admin_movies_management_editar_filme.png)

**Confirmação de exclusão**
![Excluir Filme](src/assets/screenshots/010_tela_admin_movies_management_confirmar_exclusao_de_filme.png)

---

### 👥 Gerenciamento de Usuários

**Listagem de usuários**
![Usuários](src/assets/screenshots/011_tela_admin_users_management.png)

**Hover em usuário (ações visíveis)**
![Hover Usuário](src/assets/screenshots/012_tela_admin_users_management_hover.png)

**Confirmação de Promoção**
![Promoção](src/assets/screenshots/013_tela_admin_users_management_confirmar_promocao.png)

**Lista atualizada após promoção**
![Promoção Atualizada](src/assets/screenshots/014_tela_admin_users_management_atualizada_apos_promocao.png)

**Confirmação de Rebaixamento**
![Rebaixar](src/assets/screenshots/015_tela_admin_users_management_confirmar_rebaixamento.png)

---

### ⚙️ Preferências do Usuário

**Estado inicial (somente visualização)**
![Preferências Visualização](src/assets/screenshots/016_tela_admin_user_preferences_estado_inicial.png)

**Modo edição ativado, Senha desabilitada, Checkbox “manter senha atual” marcado**
![Preferências Edição](src/assets/screenshots/017_tela_admin_user_preferences_edicao_habilitada.png)

**Modo edição ativado, Senha habilitada, Checkbox “manter senha atual” desmarcado**
![Senha Habilitada](src/assets/screenshots/018_tela_admin_user_preferences_edicao_habilitada_manter_senha_desabilidato.png)

**Botão salvar ativado após edições válidas**
![Salvar Ativado](src/assets/screenshots/019_tela_admin_user_preferences_edicoes_validas_botao_salvar_habilitado.png)

---
