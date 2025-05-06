import { Component } from '@angular/core';
import { ItemList } from 'src/app/shared/interfaces/ItemList.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  listRedirects:ItemList[]=[

    {
      tile: 'Redirects',
      items: ['Buscar propiedades', "Publicar propiedad"]
    },

    {
      tile: 'Redirects',
      items: ['Buscar propiedades', "Publicar propiedad"]
    },

    {
      tile: 'Redes sociales',
      isRow: true,
      items: ['a', "b", "c"]
    },

  ]
}
