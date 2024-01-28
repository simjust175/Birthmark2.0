import cron from "node-cron";
import card from "./createCard.js";
import mailTo from "./mailTo.js";

const getBirthdays = async () => {
    console.log("Fetching birthdays....");
    const res = await fetch('http://localhost:3444/admin/birthdays', {
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json()
    console.log(data.birthdays);
    return data.birthdays;
};

const birthdayCardSystem = () => {
    cron.schedule(`0 0 * * *`, async () => {
        const birthdays = await getBirthdays();    
        console.log(`Creating cards...., For ${birthdays.length} birthdays`);
        birthdays.forEach(birthday => {
            card(birthday.first_name, birthday.last_name, birthday.user_name, birthday.style);
            console.log(`Doc created for: ${birthday.first_name}\nEmail to ${birthday.email} will be sent shortly...`);
            mailTo(birthday.email, birthday.first_name);
        });
    });
};

// ~~~~~~ // Running function // ~~~~~~ //
birthdayCardSystem();