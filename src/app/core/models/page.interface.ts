export interface Page<T> {
  content:       T[];
  page:          number;
  size:          number;
  orderAsc:      boolean;
  totalElements: number;
  totalPages:    number;
}
