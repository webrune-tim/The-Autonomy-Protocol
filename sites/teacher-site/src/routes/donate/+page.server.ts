// sites/teacher-site/src/routes/donate/+page.server.ts
import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  donate: async ({ request }) => {
    const data = await request.formData();
    const amountString = data.get("amount");

    const amount = Number(amountString);

    // Server-side validation
    if (!amountString || isNaN(amount) || amount <= 0) {
      return fail(400, {
        error: true,
        message: "Please enter a valid donation amount.",
      });
    }

    console.log(`[SERVER] Initiating donation for: $${amount}`);

    try {
      // TODO: Add your actual PayPal SDK / API order creation logic here
      // const checkoutUrl = await createPayPalOrder(amount);

      return {
        success: true,
        amount,
        // redirect: checkoutUrl (if you redirect to PayPal directly)
      };
    } catch (err) {
      return fail(500, {
        error: true,
        message: "Failed to initialize payment gateway.",
      });
    }
  },
};
