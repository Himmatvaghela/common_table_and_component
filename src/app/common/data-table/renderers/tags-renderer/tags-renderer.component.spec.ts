import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsRendererComponent } from './tags-renderer.component';

describe('TagsRendererComponent', () => {
  let component: TagsRendererComponent;
  let fixture: ComponentFixture<TagsRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagsRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
