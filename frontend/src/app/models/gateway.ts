export class Gateway {
  _id?: string;
  serial_number: string;
  name: string;
  ipv4: string;
  createdAt?: string;
  updatedAt?: string;
  devices?: Array<Device>;
  devices_count?: number;
}

export class Device {
  created?: string;
  status?: boolean;
  uid?: string;
  vendor?: string;
  _id?: string;
}
