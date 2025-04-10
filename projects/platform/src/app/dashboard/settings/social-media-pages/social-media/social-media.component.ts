import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SocialMediaSettingsService } from './social-media.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'async-social-media-settings',
  templateUrl: 'social-media.component.html',
  styles: [`
    section {
      margin-top: 1em;

      form {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: auto;

        mat-hint {
          color: gray;
          margin: 0.5em 0;
        }

        button {
          width: 20%;
          margin-top: 1em;
        }
      }
    }
  `],
  imports: [MatExpansionModule, CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule],
  providers: [ SocialMediaSettingsService],
})
export class SocialMediaSettingsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() partner!: PartnerInterface;
  subscriptions: Array<Subscription> = [];

  forms: { [key: string]: FormGroup } = {};

  formConfigs: { [key: string]: { label: string; pattern: RegExp } } = {
    //whatsappGroup: { label: 'WhatsApp group link', pattern: /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+$/ },
    whatsappChat: { label: 'WhatsApp chat link', pattern: /^https:\/\/wa\.me\/message\/[A-Za-z0-9]+$/ },
    facebook: { label: 'Facebook page link', pattern: /^https?:\/\/(www\.)?facebook\.com\/(.*?)(\/)?$/ },
    linkedin: { label: 'LinkedIn page link', pattern: /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]*)*$/ },
    youtube: { label: 'YouTube page link', pattern: /^https?:\/\/(www\.)?youtube\.com\/(channel\/[A-Za-z0-9_-]{24}|user\/[A-Za-z0-9_-]+|c\/[A-Za-z0-9_-]+)$/ },
    instagram: { label: 'Instagram page link', pattern: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._%+-]+\/$/ },
    tiktok: { label: 'TikTok page link', pattern: /^https?:\/\/(www\.)?tiktok\.com\/@([A-Za-z0-9._]+)$/ },
    twitter: { label: 'Twitter page link', pattern: /^https?:\/\/(www\.)?x\.com\/[A-Za-z0-9_]+$/ },
  };

  // Expose the global Object to the template
  Object = Object;

  constructor(
    private fb: FormBuilder,
    private socialMediaSettingsService: SocialMediaSettingsService,
  ) {}

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['partner'] && this.partner) {
        // Ensure the socialMedia object exists
        if (!this.partner.socialMedia) {
          this.partner.socialMedia = {
            whatsappGroupLink: '',
            whatsappChatLink: '',
            facebookPage: '',
            linkedinPage: '',
            youtubePage: '',
            instagramPage: '',
            tiktokPage: '',
            twitterPage: '',
          };
        }
        this.initializeForms();
      }
    }
    
    ngOnInit(): void {
      if (this.partner) {
        // Ensure the socialMedia object exists
        if (!this.partner.socialMedia) {
          this.partner.socialMedia = {
            whatsappGroupLink: '',
            whatsappChatLink: '',
            facebookPage: '',
            linkedinPage: '',
            youtubePage: '',
            instagramPage: '',
            tiktokPage: '',
            twitterPage: '',
          };
        }
        this.initializeForms();
      }
    }

  private initializeForms(): void {
    const socialMediaKeyMap: { [key: string]: keyof PartnerInterface['socialMedia'] } = {
      whatsappChat: 'whatsappChatLink',
      facebook: 'facebookPage',
      linkedin: 'linkedinPage',
      youtube: 'youtubePage',
      instagram: 'instagramPage',
      tiktok: 'tiktokPage',
      twitter: 'twitterPage',
    };
  
    Object.keys(this.formConfigs).forEach((key) => {
      const socialMediaKey = socialMediaKeyMap[key];
      const currentLink = socialMediaKey ? this.partner.socialMedia[socialMediaKey] || '' : '';
      this.forms[key] = this.fb.group({
        profileLink: [currentLink, [Validators.required, Validators.pattern(this.formConfigs[key].pattern)]],
      });
    });
  }


  onSubmit(formKey: string): void {
    const form = this.forms[formKey];
    if (form.valid) {
      const updateObject = {
        url: form.value.profileLink,
        partnerId: this.partner._id,
      };
  
      // Map formKey to the correct service method
      const serviceMethodMap: { [key: string]: keyof SocialMediaSettingsService } = {
        whatsappGroup: 'whatsappGroupLinkUpdate',
        whatsappChat: 'whatsappChatPageUpdate',
        facebook: 'facebookPageUpdate',
        linkedin: 'linkedinPageUpdate',
        youtube: 'youtubePageUpdate',
        instagram: 'instagramPageUpdate',
        tiktok: 'tiktokPageUpdate',
        twitter: 'twitterPageUpdate',
      };
  
      const serviceMethod = serviceMethodMap[formKey];
  
      if (serviceMethod && typeof this.socialMediaSettingsService[serviceMethod] === 'function') {
        this.subscriptions.push(
          (this.socialMediaSettingsService[serviceMethod] as any)(updateObject).subscribe(
            () => {
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                text: `Your ${this.formConfigs[formKey].label} has been updated successfully`,
                confirmButtonColor: 'rgb(5, 1, 17)',
                timer: 4000,
              });
            },
            (error: HttpErrorResponse) => {
              let errorMessage = 'Server error occurred, please try again.';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;
              }
              Swal.fire({
                position: 'bottom',
                icon: 'error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 4000,
              });
            }
          )
        );
      }
    }
  }

  getExampleLink(formKey: string): string {
    switch (formKey) {
     /*  case 'whatsappGroup':
        return 'https://chat.whatsapp.com/EO6Xl6zsDwwA9yZrcVUwP2';*/
      case 'whatsappChat':
        return 'https://wa.me/message/GQ6P3GATFO4IB1'; 
      case 'facebook':
        return 'https://facebook.com/username';
      case 'linkedin':
        return 'https://linkedin.com/in/username';
      case 'youtube':
        return 'https://youtube.com/channel/UCXXXXXXXXX';
      case 'instagram':
        return 'https://instagram.com/username/';
      case 'tiktok':
        return 'https://www.tiktok.com/@username';
      case 'twitter':
        return 'https://x.com/username';
      default:
        return '';
    }
  }

  getPatternHint(formKey: string): string {
    switch (formKey) {
      /* case 'whatsappGroup':
        return 'https://chat.whatsapp.com/XXXXX';*/
      case 'whatsappChat':
        return 'https://wa.me/message/XXXXX';
      case 'facebook':
        return 'https://www.facebook.com/username or https://facebook.com/username';
      case 'linkedin':
        return 'https://linkedin.com/in/username or https://linkedin.com/pub/username';
      case 'youtube':
        return 'https://youtube.com/channel/UCXXXXXXXXX or https://youtube.com/user/username';
      case 'instagram':
        return 'https://instagram.com/username/';
      case 'tiktok':
        return 'https://tiktok.com/@username';
      case 'twitter':
        return 'https://x.com/username';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}