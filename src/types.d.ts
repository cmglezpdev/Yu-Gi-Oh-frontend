
export interface Municipality {
  id: string;
  name: string;
  provinceId: string;
}

export interface Province {
  id: string;
  name: string;
  municipalities: Municipality[];
}