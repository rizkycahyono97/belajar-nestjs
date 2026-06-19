export class WebResponse<T> {
  data?: T;
  errors?: string;
  paging?: Page;
}

export class Page {
  size?: number;
  total_page?: number;
  current_page?: number;
}
