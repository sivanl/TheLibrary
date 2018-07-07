import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Author e2e test', () => {

    let navBarPage: NavBarPage;
    let authorDialogPage: AuthorDialogPage;
    let authorComponentsPage: AuthorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Authors', () => {
        navBarPage.goToEntity('author');
        authorComponentsPage = new AuthorComponentsPage();
        expect(authorComponentsPage.getTitle())
            .toMatch(/Authors/);

    });

    it('should load create Author dialog', () => {
        authorComponentsPage.clickOnCreateButton();
        authorDialogPage = new AuthorDialogPage();
        expect(authorDialogPage.getModalTitle())
            .toMatch(/Create or edit a Author/);
        authorDialogPage.close();
    });

    it('should create and save Authors', () => {
        authorComponentsPage.clickOnCreateButton();
        authorDialogPage.setNameInput('name');
        expect(authorDialogPage.getNameInput()).toMatch('name');
        authorDialogPage.save();
        expect(authorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AuthorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-author div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AuthorDialogPage {
    modalTitle = element(by.css('h4#myAuthorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
