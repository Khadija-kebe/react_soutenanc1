import React, { useEffect } from "react";

const Cinetpay = () => {
  useEffect(() => {
    const checkout = async () => {
      try {
        const apiKey = '20954542226581ff20b46a48.06123445';
        const siteId = '5866542';

        window.CinetPay.setConfig({
          apikey: apiKey,
          site_id: siteId,
          notify_url: 'http://mondomaine.com/notify/',
          mode: 'PRODUCTION',
        });

        const transactionId = Math.floor(Math.random() * 100000000).toString();

        const customerDetails = {
          customer_name: 'Joe',
          customer_surname: 'Down',
          customer_email: 'down@test.com',
          customer_phone_number: '088767611',
          customer_address: 'BP 0024',
          customer_city: 'Antananarivo',
          customer_country: 'CM',
          customer_state: 'CM',
          customer_zip_code: '06510',
        };

        const res = await window.CinetPay.getCheckout({
          transaction_id: transactionId,
          amount: totalCartPrice,
          currency: 'XOF',
          channels: 'ALL',
          description: 'Test de paiement',
          ...customerDetails,
        });

        console.log(res);

        window.CinetPay.waitResponse((data) => {
          if (data.status === 'REFUSED') {
            alert('Votre paiement a échoué');
            window.location.reload();
          } else if (data.status === 'ACCEPTED') {
            alert('Votre paiement a été effectué avec succès');
            window.location.reload();
            setShowPaymentModal(true);
          }
        });

        window.CinetPay.onError((data) => {
          console.log(data);
        });
        setShowCancelButton(true);
      } catch (error) {
        console.error(error);
      }
    };

    // Make the checkout function accessible globally
    window.checkout = checkout;

    // Load CinetPay script
    const script = document.createElement('script');
    script.src = "https://cdn.cinetpay.com/seamless/main.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script on component unmount
      document.body.removeChild(script);
    };
  }, [totalCartPrice]);

  return (
    <div>
      <iframe
        title="CinetPay Frame"
        id="cinetpay-frame"
        srcDoc="<html><head></head><body><div id='cinetpay-container'></div></body></html>"
        style={{ width: '100%', height: '500px', border: 'none' }}
      />
    </div>
  );
}

export default Cinetpay;
