/* The PaymentPage class contains methods and properties for interacting with a payment page on the Stripe Payments Demo website. */
const waitOptions = { timeout: 5000, timeoutMsg: 'Timeout occured while waiting for element to be available.' };

class PaymentPage {

    get generateLink() { return $('#generate'); }
    get cardNumberInput() { return $('input[name="cardnumber"]'); }
    get cardExpirationInput() { return $('input[name="exp-date"]'); }
    get cardCvcInput() { return $('input[name="cvc"]'); }
    get payButton() { return $('button.payment-button'); }
    get formErrorMessage() { return $('#card-errors'); }
    get checkOutErrorMessage() { return $('p.error-message'); }
    get successPayment() { return $('#main.checkout.success'); }
    get errorPayment() { return $('#main.checkout.error'); }

    async open() {
        await browser.url('https://stripe-payments-demo.appspot.com/', {
            waitUntil: 'load',
            ...waitOptions
        });
    }

    async clickAndWait(inputElement) {
        await inputElement.waitForClickable(waitOptions);
        await inputElement.click();
    }

    async enterValueAndWait(inputElement, value) {
        await inputElement.waitForDisplayed(waitOptions);
        await inputElement.setValue(value);
    }

    async clickGenerate() {
        await this.clickAndWait(this.generateLink);
    }

    async enterPaymentInfo(cardNumber, cardExpiration, cardCvc) {
        const iframe = await $('//div[@id="card-element"]//iframe');
        await browser.switchToFrame(iframe);

        await this.enterValueAndWait(this.cardNumberInput, cardNumber);
        await this.enterValueAndWait(this.cardExpirationInput, cardExpiration);
        await this.enterValueAndWait(this.cardCvcInput, cardCvc);

        await browser.switchToParentFrame();
    }

    async clickPayButton() {
        await this.clickAndWait(this.payButton);
    }

    async isFormErrorMessage(text) {
        await expect(this.formErrorMessage).toHaveTextContaining(text)
    }

    async isCheckOutErrorMessage(text) {
        await expect(this.checkOutErrorMessage).toHaveTextContaining(text)
    }

    async isPaymentSuccessful() {
        return await this.successPayment.isDisplayed();
    }

    async isPaymentFailed() {
        return await this.errorPayment.isDisplayed();
    }

}


module.exports = new PaymentPage();