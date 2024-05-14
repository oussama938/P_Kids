import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeechSynthService } from './services/text-to-speech-synth.service';
import { SttService } from './services/stt.service';
import { ScriptLoaderService } from './services/script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  transcript: string = '';


  constructor(private route:Router,public sp:TextToSpeechSynthService,private speechToTextService:SttService,private scriptLoader:ScriptLoaderService){
    this.scriptLoader.loadScript('../assets/script/script.js').then(() => {
      console.log("Script Loaded successefully !");
  
      }).catch((error) => {
        // Handle error if script fails to load
        console.error('Script loading failed:', error);
      });
  }

  ngOnInit(): void {
    this.route.navigateByUrl('acceuil')
    this.askForAuthorization()
  }

  loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve();
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  askForAuthorization() {
    // Call the function from the loaded script to ask for microphone authorization
    (window as any).askForMicrophoneAuthorization()
      .then(() => console.log("Microphone authorized"))
      .catch((error: any) => console.error("Error asking for authorization:", error));
  }

  listenForSpeech() {
    // Call the function from the loaded script to listen for speech
    (window as any).listenForSpeech(5000) // Listen for 5 seconds
      .then((transcript: any) => console.log("Recognized speech:", transcript))
      .catch((error: any) => console.error("Error recognizing speech:", error));
  }
  
  

}
