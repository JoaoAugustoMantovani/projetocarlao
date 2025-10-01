import  nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  from: string;
  subject: string;
  html: string;
}

const sendEmail = async (data: EmailData) => {
  let transporter: nodemailer.Transporter;
  let email_from = 'Teste Envio';
  let transportOptions;
  try {
    
    email_from = process.env.EMAIL_FROM || "Teste envio email";

    transportOptions = {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
    };
    // A mágica acontece aqui: usamos 'as any' para forçar o tipo,
    // eliminando o erro de build.
    transporter = nodemailer.createTransport(transportOptions as any);

    const info = await transporter.sendMail({
      from: `${email_from} <${process.env.EMAIL_USER}>`,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
   // console.log('E-mail enviado: %s', info.messageId);
    await transporter.close();
    return info;
  } catch (error) {
    //console.error('Erro ao enviar e-mail:', error);
    throw new Error('Falha ao enviar e-mail.');
  }
};

// --- Modelos de E-mail ---

// Exemplo 1: E-mail de boas-vindas
export const sendWelcomeEmail = async (to: string, name: string) => {
  
  const from = "Sistema Contabil - DAPESI";
  const subject = 'Bem-vindo(a) à nossa plataforma!';
  const html = `
    <h1>Olá, ${name}!</h1>
    <p>Seja muito bem-vindo(a) à nossa plataforma. Estamos felizes em tê-lo(a) conosco.</p>
    <p>Se tiver alguma dúvida, entre em contato.</p>
  `;
  return sendEmail({ to, from , subject, html });
};

// Exemplo 2: E-mail de redefinição de senha
export const sendResetPasswordEmail = async (to: string, token: string) => {
  
  const subject = 'Redefinição de Senha';
  const from = "Sistema Contabil - DAPESI";
  const html = `
    <h1>Olá!</h1>
    <p>Recebemos uma solicitação para redefinir sua senha.</p>
    <p>Clique no link abaixo para criar uma nova senha:</p>
    <p> Codigo de verificação </p>
    <p> ${token} </p>
    
    <p>Se você não solicitou a redefinição de senha, por favor, ignore este e-mail.</p>
  `;
  return sendEmail({ to, from, subject, html });
};

//<a href="http://seu-frontend/reset-password?token=${token}">Redefinir Senha</a>

// Exemplo 3: E-mail de teste de funcionamento
export const sendEmailTest = async (to: string) => {
  console.log( to );
  
  const from = "Sistema Contabil - DAPESI";
  const subject = 'email de teste de envio';
  const html = `
    <h1>Olá!</h1>
    <p>Este email esta sendo enviado como parte do teste de funcionamento do back-end.</p>
    <p>Não responder este email.</p>
    <p>Sistema de back-end projeto</p>
  `;
  return sendEmail({ to, from, subject, html });
};


// Exemplo 4: E-mail de boas-vindas e ativação conta email
// activate account
export const sendActivateAccountMail = async (to: string, name: string) => {
  
  const from = "Sistema Contabil - DAPESI";
  const subject = 'Bem-vindo(a) à nossa plataforma!';
  const html = `
    <h1> Ativação conta de Acesso</h1>
    <h2>Olá, ${name}!</h2>
    <p>Seja muito bem-vindo(a) à nossa plataforma. Estamos felizes em tê-lo(a) conosco.</p>
    <p>Sua conta foi <strong>ativada com sucesso</strong>.</p>
    <p>Em caso de dúvidas ou necessidade de aucilio, entre em contato conosco.</p><br><br>
    <p>Equipe Dapesi</p>
  `;
  return sendEmail({ to, from , subject, html });
};