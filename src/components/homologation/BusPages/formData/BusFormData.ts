// src/components/homologation/BusPages/formData/BusFormData.ts

export type ManufacturerData = {
  manufacturer: string;
  manufacturerAddress: string;
  telephone: string;
  fax: string;
  email: string;
  contactPerson: string;
  modelVariant: string;
};

export type ManufacturerPlantData = {
  manufacturer: string;
  manufacturerAddress: string;
  telephone: string;
  fax: string;
  email: string;
  contactPerson: string;
  modelVariant: string;
};

export type VehicleBasicDetailsData = {
  manufacturer: string;
  manufacturerAddress: string;
  telephone: string;
  fax: string;
  email: string;
  contactPerson: string;
  modelVariant: string;
};

export type WeighmentData = {
  manufacturer: string;
  manufacturerAddress: string;
  telephone: string;
  fax: string;
  email: string;
  contactPerson: string;
  modelVariant: string;
};

export type TyreAndWheelRimData = {
  tyre: Record<string, string>;
  wheelRim: Record<string, string>;
  wheelNut: Record<string, string>;
  tpms: Record<string, string>;
};

export type DocumentData = {
  documentName: string;
  documentNumber: string;
  documentType: string;
  issueDate: string;
  expiryDate: string;
  remarks: string;
};

export type NotificationData = {
  notificationType: string;
  notificationTitle: string;
  notificationDate: string;
  notificationStatus: string;
  description: string;
  remarks: string;
};

export type SettingData = {
  userName: string;
  emailId: string;
  contactNumber: string;
  companyName: string;
  vehicleType: string;
  language: string;
};

export type BusFormData = {
  manufacturerDetails: Record<number, ManufacturerData>;

  manufacturerPlantDetails: ManufacturerPlantData;

  vehicleBasicDetails: VehicleBasicDetailsData;

  weighmentDetails: WeighmentData;

  tyreAndWheelRim: TyreAndWheelRimData;

  documents: DocumentData;

  notification: NotificationData;

  setting: SettingData;
};

export const initialBusFormData: BusFormData = {
  manufacturerDetails: {
    1: {
      manufacturer: "",
      manufacturerAddress: "",
      telephone: "",
      fax: "",
      email: "",
      contactPerson: "",
      modelVariant: "",
    },
    2: {
      manufacturer: "",
      manufacturerAddress: "",
      telephone: "",
      fax: "",
      email: "",
      contactPerson: "",
      modelVariant: "",
    },
    3: {
      manufacturer: "",
      manufacturerAddress: "",
      telephone: "",
      fax: "",
      email: "",
      contactPerson: "",
      modelVariant: "",
    },
  },

  manufacturerPlantDetails: {
  manufacturer: "",
  manufacturerAddress: "",
  telephone: "",
  fax: "",
  email: "",
  contactPerson: "",
  modelVariant: "",
},

  vehicleBasicDetails: {
  manufacturer: "",
  manufacturerAddress: "",
  telephone: "",
  fax: "",
  email: "",
  contactPerson: "",
  modelVariant: "",
},

  weighmentDetails: {
    manufacturer: "",
    manufacturerAddress: "",
    telephone: "",
    fax: "",
    email: "",
    contactPerson: "",
    modelVariant: "",
  },

  tyreAndWheelRim: {
    tyre: {},
    wheelRim: {},
    wheelNut: {},
    tpms: {},
  },

  documents: {
    documentName: "",
    documentNumber: "",
    documentType: "",
    issueDate: "",
    expiryDate: "",
    remarks: "",
  },

  notification: {
    notificationType: "",
    notificationTitle: "",
    notificationDate: "",
    notificationStatus: "",
    description: "",
    remarks: "",
  },

  setting: {
    userName: "",
    emailId: "",
    contactNumber: "",
    companyName: "",
    vehicleType: "",
    language: "",
  },
};