export class ServiceForAdmin {
    MedicalCenter: string;
    FechaServicio: string;
    WorkerName: string;
    ProtocolName: string;
    OrganizationName: string;
    CurrentOccupation: string;
    ServiceId: string;
    PersonId: string;
    ComponentId: string;
    ServiceComponentId: string;
    IIndex: number;
    OrganizationId: string;
    TelephoneNumber: string;
    EncuestaCulminada: number;
    LaboratorioCulminada: number;
    ClinicaExternad: number;
    TypeExam: string;
    static buildFromJson(json: any): ServiceForAdmin {
        const serviceForAdmins = new ServiceForAdmin();
        return Object.assign(serviceForAdmins, json);
    }
}
