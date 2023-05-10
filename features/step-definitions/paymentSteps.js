const { Given, When, Then } = require('@cucumber/cucumber');

const PaymentPage = require('../pages/paymentPage');

Given('the user is at the Stripe Demo Site', async function () {
    await PaymentPage.open();
});

Given('the user auto generates shipping information', async function () {
    await PaymentPage.clickGenerate();
});


When('the user enters the payment information with the following data', async function (dataTable) {
    const cardInformation = dataTable.rawTable.slice(1).map(row => {
        return {
            cardNumber: row[0],
            cardExpiry: row[1],
            cvc: row[2],
        };
    });

    for (let i = 0; i < cardInformation.length; i++) {
        await PaymentPage.enterPaymentInfo(cardInformation[i].cardNumber, cardInformation[i].cardExpiry, cardInformation[i].cvc)
    }

});

When('the user clicks the Pay button', async function () {
    await PaymentPage.clickPayButton()
});


Then('form error should show containing the following message {string}', async function (string) {
    await PaymentPage.isFormErrorMessage(string)
});

Then('checkout error should show containing the following message {string}', async function (string) {
    await PaymentPage.isCheckOutErrorMessage(string)
});

Then('the payment should be successful', async function () {
    await PaymentPage.isPaymentSuccessful();
});

Then('the payment should be declined', async function () {
    await PaymentPage.isPaymentFailed();
});
