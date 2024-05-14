import { TestBed } from '@angular/core/testing';

import { TextToSpeechSynthService } from './text-to-speech-synth.service';

describe('TextToSpeechSynthService', () => {
  let service: TextToSpeechSynthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToSpeechSynthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
