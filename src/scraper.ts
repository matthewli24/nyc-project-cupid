import { APIResponse, Browser, BrowserContext, chromium, Page, request } from 'playwright';
import {
  AvailableTimeSlots,
  DayTimeSlots,
  Location,
  LocationIds,
  locationType,
  MarriageCeremonyResponse,
  OfficeLocations,
  officeType,
  payload,
  TimeSlot
} from './models';

/************************************************************************************************************/

const scrapWebsite = async () => {
  const browser: Browser = await chromium.launch({ headless: true });
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();
  const url = 'https://clerkscheduler.cityofnewyork.us/s/MarriageCeremony'

  let webTimeSlots: AvailableTimeSlots = {
    Manhattan: [],
    Queens: [],
    Bronx: [],
    Brooklyn: [],
    StatenIsland: []
  };

  await page.goto(url);

  for (const [key, value] of Object.entries(OfficeLocations)) {
    const location = key as locationType;
    switch (value) {
      case OfficeLocations.Manhattan: {
        await extractTimeSlots(location, value, page, webTimeSlots)
          .then(res => webTimeSlots = res);
        break;
      }
      case OfficeLocations.Queens: {
        await extractTimeSlots(location, value, page, webTimeSlots)
          .then(res => webTimeSlots = res);
        break;
      }
      case OfficeLocations.Brooklyn: {
        await extractTimeSlots(location, value, page, webTimeSlots)
          .then(res => webTimeSlots = res);
        break;
      }
      case OfficeLocations.Bronx: {
        await extractTimeSlots(location, value, page, webTimeSlots)
          .then(res => webTimeSlots = res);
        break;
      }
      case OfficeLocations.StatenIsland: {
        await extractTimeSlots(location, value, page, webTimeSlots)
          .then(res => webTimeSlots = res);
        break;
      }
      default: {
        console.error('Office does not exist!');
        break;
      }
    }
  }

  console.log('webTimeSlots', webTimeSlots);

  await context.close();
  await browser.close();
}

const extractTimeSlots = async (location: locationType, office: officeType, page: Page, timeslots: AvailableTimeSlots): Promise<AvailableTimeSlots> => {
  await page.click('[placeholder="Select Office Location"]');
  await page.click(`span:has-text('${office}')`);

  // const noAppointmentsText = 'All available appointments have been booked. We load new appointments frequently. Check back soon.'
  // const isAvailable = await page.textContent('p.slds-text-color_error') !== noAppointmentsText;

  // TODO

  if (true) {
    console.log(location)
    // extract for html elements
    const newTimeSlotFound: TimeSlot[] = []

    const r = await page.$eval('.scheduler-card', (card) => {

      console.log(card);
      return card;

    })


    console.log('res', r);

    // add and return timeslots
    const result = { ...timeslots };
    result[location] = [...newTimeSlotFound];
    return result;

  }

  return timeslots;
}

/************************************************************************************************************/

let availableTimeSlots: AvailableTimeSlots = {
  Manhattan: [],
  Queens: [],
  Bronx: [],
  Brooklyn: [],
  StatenIsland: []
};

const scrapeAPI = async () => {
  for (const [key, value] of Object.entries(LocationIds)) {
    const location = key as locationType;
    await postRequest(location, getFormData(value));
  }
}

const getFormData = (id: string): payload => {
  return {
    'aura.context': '{"mode":"PROD","fwuid":"7FPkrq_-upw5gdD4giTZpg","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"B78-aNM4IDOksLJusJF3g"},"dn":[],"globals":{},"uad":false}',
    'aura.pageURI': '/s/MarriageCeremony',
    'aura.token': 'undefined',
    'message': `{"actions":[{"id":"999;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"SCHED_BookAppointmentController","method":"getSlots","params":{"isDeviceMobile":false,"isCeremonyFlow":true,"isLicenseFlow":false,"isDomesticFlow":false,"isCertificateOfNonImpediment":false,"isRecordsRoom":false,"isMarriageOfficiantRegistration":false,"isPageLoad":true,"isDateChanged":false,"isWeekChanged":false,"weekAction":null,"locationId":"${id}","selectedDate":null,"selectedSlotId":null,"selectedSlotData":"null"},"cacheable":false,"isContinuation":false}}]}`
  };
}

const postRequest = async (location: locationType, formData: payload) => {
  const url = 'https://clerkscheduler.cityofnewyork.us';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://clerkscheduler.cityofnewyork.us',
    'Referer': 'https://clerkscheduler.cityofnewyork.us/s/MarriageCeremony'
  };
  const context = await request.newContext({
    baseURL: url
  });

  await (await context.post('/s/sfsites/aura', { headers: headers, form: formData})).json()
    .then((response: MarriageCeremonyResponse) => handleResponse(location, response))
    .catch(err => console.log('Error on POST Request: ', err));
}

const handleResponse = (location: locationType, response: MarriageCeremonyResponse): void => {
  const { actions } = response;
  const { returnValue: outterValue } = actions[0];
  const { returnValue: innerValue } = outterValue;

  if (innerValue && !innerValue.noSlotsAvailable) {
    const { daySlotsColumns } = innerValue;

    const timeslots: TimeSlot[] = daySlotsColumns.reduce((acc: TimeSlot[], curr: DayTimeSlots) => {
      if (curr.slots.length > 0) {
        const date = curr.slots[0].startDateTime.substring(0, 10);
        const times = curr.slots.map(slot => slot.timeLabel);

        return [...acc, {date, times}];
      }

      return acc;
    }, []);

    availableTimeSlots[location] = timeslots;
  }
}

/************************************************************************************************************/

const main = async () => {
  await scrapeAPI().then(() => console.log(availableTimeSlots))
  // await scrapWebsite();
}

main();
