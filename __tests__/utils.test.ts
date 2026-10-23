import {
  formatStrArray,
  validateEnum,
  parseOffsetString,
  getOffsetDate,
  isLabelEvent,
  isCreatedByUser,
  removeDuplicates,
} from '../src/utils';
import { OffsetUnits } from '../src/enums';
import { IssueEvent } from '../src/types';

function createDummyIssueEvent(actorType: string, event: string): IssueEvent {
  return {
    actor: { type: actorType },
    event,
    label: { name: 'name' },
  };
}

describe('utils', () => {
  it(formatStrArray.name, () => {
    expect(formatStrArray(['a', 'b', 'c'])).toBe('- a\n- b\n- c\n');
    expect(formatStrArray([])).toBe('');
  });

  it(validateEnum.name, () => {
    enum B {
      B = 'b',
    }
    expect(validateEnum('a', 'b' as string, B)).toBeUndefined();

    enum CD {
      C = 'c',
      D = 'd',
    }
    const f = (): void => {
      validateEnum('a', 'b' as string, CD);
    };
    expect(f).toThrow(new Error("`a` must be one of ['c', 'd'], but got 'b'"));
  });

  it(parseOffsetString.name, () => {
    expect(parseOffsetString('1m')).toEqual([1, 'm']);
    expect(parseOffsetString('12m')).toEqual([12, 'm']);

    expect(() => parseOffsetString('m')).toThrow(Error);
    expect(() => parseOffsetString('1b')).toThrow(Error);
    expect(() => parseOffsetString('12')).toThrow(Error);
    expect(() => parseOffsetString('1mm')).toThrow(Error);
    expect(() => parseOffsetString('m1m')).toThrow(Error);
    expect(() => parseOffsetString('1m1')).toThrow(Error);
  });

  it(getOffsetDate.name, () => {
    const date = new Date('2020-10-10T10:10:10.000Z');

    expect(getOffsetDate(date, 1, OffsetUnits.HOUR)).toEqual(
      new Date('2020-10-10T09:10:10.000Z'),
    );

    expect(getOffsetDate(date, 1, OffsetUnits.DAY)).toEqual(
      new Date('2020-10-09T10:10:10.000Z'),
    );

    expect(getOffsetDate(date, 1, OffsetUnits.MONTH)).toEqual(
      new Date('2020-09-10T10:10:10.000Z'),
    );
  });

  it(isLabelEvent.name, () => {
    let event: IssueEvent;

    event = createDummyIssueEvent('User', 'labeled');
    expect(isLabelEvent(event)).toBe(true);

    event = createDummyIssueEvent('User', 'unlabeled');
    expect(isLabelEvent(event)).toBe(true);

    event = createDummyIssueEvent('User', 'closed');
    expect(isLabelEvent(event)).toBe(false);
  });

  it(isCreatedByUser.name, () => {
    let event: IssueEvent;

    event = createDummyIssueEvent('User', 'labeled');
    expect(isCreatedByUser(event)).toBe(true);

    event = createDummyIssueEvent('Bot', 'labeled');
    expect(isCreatedByUser(event)).toBe(false);
  });

  it(removeDuplicates.name, () => {
    expect(removeDuplicates(['a', 'b', 'a'])).toEqual(['a', 'b']);
    expect(removeDuplicates([0, 1, 0])).toEqual([0, 1]);
    expect(removeDuplicates([true, false, true])).toEqual([true, false]);
  });
});
