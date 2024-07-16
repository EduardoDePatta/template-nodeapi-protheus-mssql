import { User } from "../../api/auth/interfaces"

export interface SendReportDataTemplateParams {
  user: User
  descricao: string
}

const generateSendReportDataTemplate = ({ user, descricao }: SendReportDataTemplateParams): string => {
  return `
  <center>
    <table width="600">
      <tr>
        <td align="center" style="font-family:Arial;"><br /><br />
          <strong>BUG REPORTADO - PORTAL DO REPRESENTANTE</strong>
        </td>
      </tr>
      <tr>
        <td width="600" style="font-family:Arial;">
          <br /><br />Usuário: ${user.nomeUsuario}. Login: ${user.login}. Empresa: ${user.empresa}. Código do Vendedor: ${user.codVend}. ID: ${user.R_E_C_N_O_}. E-mail: ${user.email}
          <br /><br />DESCRIÇÃO: ${descricao}<br /><br />
        </td>
      </tr>
      <tr>
        <td width="600" style="font-family:Arial;background-color:#CCCCCC;">
          <center><strong>Sistema Personal Net</strong></center>
        </td>
      </tr>
    </table>
  </center>
  `
}

export { generateSendReportDataTemplate }
