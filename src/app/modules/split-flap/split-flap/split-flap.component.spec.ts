import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitFlapComponent } from './split-flap.component';

describe('SplitFlapComponent', () => {
  let component: SplitFlapComponent;
  let fixture: ComponentFixture<SplitFlapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitFlapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SplitFlapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
