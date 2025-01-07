export interface IPlacesState {
  places: IPlace[];
  placeStatus: 'idle' | 'pending' | 'fulfilled' | 'failed';
  placeError: any;
}
export interface IPlace {
  id: number;
  name: string;
  images: string;
  description: string;
  visited: boolean;
}
