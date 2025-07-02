/* eslint-disable */
// DATA TRANSFER OBJECT
// object that defines the shape of data sent to the server
// and received from the server
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  roleId: number;
}
