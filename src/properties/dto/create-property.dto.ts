export class CreatePropertyDto {
  price: number; // Sensible, se almacena en la blockchain

  // Datos adicionales, se almacenan en la base de datos
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  size?: number;
  images?: string[];
  ownerName?: string;
  contactInfo?: string;
}
