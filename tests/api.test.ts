import { APIResponse, request } from 'playwright';
import { MarriageCeremonyResponse } from '../src/models';

describe('API Test', () => {
  const url = 'https://clerkscheduler.cityofnewyork.us';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://clerkscheduler.cityofnewyork.us',
    'Referer': 'https://clerkscheduler.cityofnewyork.us/s/MarriageCeremony'
  };
  const params = {
    'r': '1',
    'ApexAction.execute': '1'
  }
  const formData = {
    'aura.context': '{"mode":"PROD","fwuid":"7FPkrq_-upw5gdD4giTZpg","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"B78-aNM4IDOksLJusJF3g"},"dn":[],"globals":{},"uad":false}',
    'aura.pageURI': '/s/MarriageCeremony',
    'aura.token': 'undefined',
    'message': `{"actions":[{"id":"999;a","descriptor":"aura://ApexActionController/ACTION$execute","callingDescriptor":"UNKNOWN","params":{"namespace":"","classname":"SCHED_BookAppointmentController","method":"getSlots","params":{"isDeviceMobile":false,"isCeremonyFlow":true,"isLicenseFlow":false,"isDomesticFlow":false,"isCertificateOfNonImpediment":false,"isRecordsRoom":false,"isMarriageOfficiantRegistration":false,"isPageLoad":true,"isDateChanged":false,"isWeekChanged":false,"weekAction":null,"locationId":"0013d000004de23AAA","selectedDate":null,"selectedSlotId":null,"selectedSlotData":"null"},"cacheable":false,"isContinuation":false}}]}`
  };

  test('API POST SUCCESS', async () => {
    const context = await request.newContext({
      baseURL: url
    });

    const response: APIResponse = await context.post('/s/sfsites/aura', {
      headers: headers,
      form: formData
    })

    expect(response.status()).toBe(200);
    expect(response.ok).toBeTruthy;

    await response.json()
      .then((res: MarriageCeremonyResponse) => console.log(res.actions[0].returnValue.returnValue?.daySlotsColumns))
      .catch(err => console.log('Error: ', err));
  })
})