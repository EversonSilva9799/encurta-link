import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { LinkPost } from '../../../../data/models/LinkPost';
import { Response } from '../../../../data/models/Response';
import { LinkService } from '../../../../data/services/link.service';
import { Link } from '../../../../data/models/Link';

@Component({
	selector: 'app-generate-link',
	templateUrl: './generate-link.component.html',
	styleUrls: [ './generate-link.component.css' ]
})
export class GenerateLinkComponent implements OnInit {
	public linkPost: LinkPost = new LinkPost();
	public link: Link = new Link();
	public links: Link[] = [];
	public generating = false;
	public url = '';
	public textCopy = false;

	constructor(private linkService: LinkService, private apiService: ApiService) {}

	ngOnInit(): void {
		this.index();
	}

	public index() {
		this.linkService.index().subscribe((response: Response) => {
			this.links = response.body;
		});
	}

	public generate(form: NgForm) {
		this.generating = true;
		this.linkService.store(this.linkPost).subscribe((response: Response) => {
			this.generating = false;
			this.link = response.body;
			this.url = `${this.apiService.getOwnUrl()}/url/${this.link.shortenedUrl}`;
		});
	}

	public copy(inputText: any) {
		inputText.disabled = false;
		inputText.select();
		document.execCommand('copy');
		window.getSelection().removeAllRanges();
		this.textCopy = true;
		inputText.disabled = true;

		setTimeout(() => {
			this.textCopy = false;
		}, 2000);
	}
}
