export interface BboxDto {
  categoryId: string;
  coordinates: {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
  };
}