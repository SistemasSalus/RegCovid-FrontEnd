import { IToken } from './token.interface';

export class UserModel {
  public userId?: number;
  public organizationId?: string;
  public protocolId?: string;
  public nodeId?: number;
  public nodeName?: string;
  public userName?: string;

  constructor(token: IToken) {
    this.userId = token.respUsuarioId;
    this.organizationId = token.respOrganizationId;
    this.protocolId = token.respProtocolId;
    this.nodeId = token.respNodeId;
    this.nodeName = token.respNodeName;
    this.userName = token.respUserName;
  }
}
