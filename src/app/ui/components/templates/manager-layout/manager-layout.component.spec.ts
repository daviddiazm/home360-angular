import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLayoutComponent } from './manager-layout.component';
import { MoleculesModule } from '../../molecules/molecules.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { OrganismsModule } from '../../organisms/organisms.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagerLayoutComponent', () => {
  let component: ManagerLayoutComponent;
  let fixture: ComponentFixture<ManagerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerLayoutComponent],
      imports: [MoleculesModule, AtomsModule, OrganismsModule, RouterTestingModule ]

    });
    fixture = TestBed.createComponent(ManagerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
