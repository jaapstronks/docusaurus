/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {translate} from '../Translate';

describe('translate', () => {
  test('accept id and use it as fallback', () => {
    expect(translate({id: 'some-id'})).toEqual('some-id');
  });

  test('accept message and use it as fallback', () => {
    expect(translate({message: 'some-message'})).toEqual('some-message');
  });

  test('accept id+message and use message as fallback', () => {
    expect(translate({id: 'some-id', message: 'some-message'})).toEqual(
      'some-message',
    );
  });

  test('reject when no id or message', () => {
    // TODO tests are not resolving type defs correctly
    // @ts-expect-error: TS should protect when both id/message are missing
    expect(() => translate({})).toThrowErrorMatchingInlineSnapshot(
      `"Docusaurus translation declarations must have at least a translation id or a default translation message"`,
    );
  });
});
