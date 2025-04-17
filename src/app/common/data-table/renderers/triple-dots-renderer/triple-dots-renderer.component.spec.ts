import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleDotsRendererComponent } from './triple-dots-renderer.component';

describe('TripleDotsRendererComponent', () => {
  let component: TripleDotsRendererComponent;
  let fixture: ComponentFixture<TripleDotsRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripleDotsRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripleDotsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
