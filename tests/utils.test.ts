import { AvailableTimeSlots, DayTimeSlots, locationType, MarriageCeremonyResponse, TimeSlot } from "../src/models";

const mockResponse: MarriageCeremonyResponse = {
  'actions': [
    {
      'id': '95;a',
      'state': 'SUCCESS',
      'returnValue': {
        'returnValue': {
          'weekHeader': 'Sun, 30 January - Sat, 05 February',
          'daySlotsColumns': [
            {
              'dateAriaLabel': 'No appointment slots are availabile for Monday 31',
              'dateGroupName': 'NoappointmentslotsareavailabileforMonday31',
              'dateHeader': 'Mon 31',
              'slots': []
            },
            {
              'dateAriaLabel': 'No appointment slots are availabile for Tuesday 01',
              'dateGroupName': 'NoappointmentslotsareavailabileforTuesday01',
              'dateHeader': 'Tue 01',
              'slots': []
            },
            {
              'dateAriaLabel': 'No appointment slots are availabile for Wednesday 02',
              'dateGroupName': 'NoappointmentslotsareavailabileforWednesday02',
              'dateHeader': 'Wed 02',
              'slots': []
            },
            {
              'dateAriaLabel': 'Thursday 03',
              'dateGroupName': 'Thursday03',
              'dateHeader': 'Thu 03',
              'slots': [
                {
                  'startDateTime': '2022-02-03T16:30:00.000Z',
                  'startTime': 41400000,
                  'timeAriaLabel': '11:30 AM Thursday',
                  'timeLabel': '11:30 AM'
                },
                {
                  'startDateTime': '2022-02-03T19:30:00.000Z',
                  'startTime': 41400000,
                  'timeAriaLabel': '02:30 PM Thursday',
                  'timeLabel': '02:30 PM'
                }
              ]
            },
            {
              'dateAriaLabel': 'Friday 04',
              'dateGroupName': 'Friday04',
              'dateHeader': 'Fri 04',
              'slots': [
                {
                  'startDateTime': '2022-02-04T20:30:00.000Z',
                  'startTime': 55800000,
                  'timeAriaLabel': '03:30 PM Friday',
                  'timeLabel': '03:30 PM'
                }
              ]
            }
          ],
          'maxDate': '2022-02-04',
          'disableNext': true,
          'disablePrevious': true,
          'selectedDate': '2022-01-11',
          'nextAvailableDate': '2022-02-03',
          'minDate': '2022-01-11',
          'noSlotsAvailable': false
        },
        'cacheable': false
      },
      'error': []
    }
  ],
  'context': {
    'mode': 'PROD',
    'app': 'siteforce:communityApp',
    'contextPath': '/s/sfsites',
    'pathPrefix': '',
    'fwuid': '7FPkrq_-upw5gdD4giTZpg',
    'mlr': 1,
    'loaded': {
      'APPLICATION@markup://siteforce:communityApp': 'B78_-aNM4IDOksLJusJF3g'
    },
    'globalValueProviders': [
      {
        'type': '$Global',
        'values': {
          'eswConfigDeveloperName': {
            'writable': true,
            'defaultValue': ''
          },
          'isVoiceOver': {
            'writable': true,
            'defaultValue': false
          },
          'setupAppContextId': {
            'writable': true,
            'defaultValue': ''
          },
          'density': {
            'writable': true,
            'defaultValue': ''
          },
          'srcdoc': {
            'writable': false,
            'defaultValue': false
          },
          'appContextId': {
            'writable': true,
            'defaultValue': ''
          },
          'dynamicTypeSize': {
            'writable': true,
            'defaultValue': ''
          }
        }
      }
    ],
    'enableAccessChecks': true,
    'apce': 1,
    'dns': 'c',
    'ls': 1,
    'lv': '53',
    'mna': {
      'lightning': 'interop'
    },
    'arse': 1,
    'acaf': 1,
    'services': [
      'markup://lightning:configProvider',
      'markup://community_designtime:salesforceScopedModuleResolver',
      'markup://force:ldsEngineCreator',
      'markup://instrumentation:locatorService'
    ]
  },
  'perfSummary': {
    'version': 'core',
    'request': 71,
    'actions': {
      '95;a': {
        'total': 47,
        'db': 21
      }
    },
    'actionsTotal': 47,
    'overhead': 0
  }
};

describe ('Handling the response', () => {
  const availableTimeSlots: AvailableTimeSlots = {
    Manhattan: [],
    Queens: [],
    Bronx: [],
    Brooklyn: [],
    StatenIsland: []
  };

  const handleResponse = (location: locationType ,response: MarriageCeremonyResponse): void => {
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

  test('Getting correct timeslots', () => {
    handleResponse('Manhattan', mockResponse);
    const result = {
      Manhattan: [
        { date: '2022-02-03', times: ['11:30 AM', '02:30 PM'] },
        { date: '2022-02-04', times: ['03:30 PM'] }
      ],
      Queens: [],
      Bronx: [],
      Brooklyn: [],
      StatenIsland: []
    }

    expect(availableTimeSlots).toMatchObject(result);
  })


})