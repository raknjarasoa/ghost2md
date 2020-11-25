import { SettingsResponse } from '@tryghost/content-api';
import _ from 'lodash';

import { parseCodeinjection } from './parse-codeinjection';

export const setCodeInjections = (
  setting: SettingsResponse
): SettingsResponse => {
  /**
   * Assert the presence of any code injections, from both the use and ghost.
   */
  const codeinjectionHead = (setting.codeinjection_head || setting.ghost_head)!;
  const codeinjectionFoot = (setting.codeinjection_foot || setting.ghost_foot)!;
  const allCodeinjections = codeinjectionHead
    ? codeinjectionHead.concat(codeinjectionFoot)
    : codeinjectionFoot
    ? codeinjectionFoot
    : null;

  /**
   * If there are any code injections, extract style tags from the markup and
   * transform the setting object to include the `codeinjection_styles` key with the value of those style tags.
   */
  if (allCodeinjections) {
    const parsedCodeinjections = parseCodeinjection(allCodeinjections);

    if (_.isEmpty(setting.codeinjection_head)) {
      setting.codeinjection_head = parsedCodeinjections.styles;
    } else {
      setting.codeinjection_head += parsedCodeinjections.styles;
    }
  }

  /**
   * Ensure always non-null by setting `.codeinjection_head` to
   * an empty string instead of null.
   */
  setting.codeinjection_head = _.isNil(setting.codeinjection_head)
    ? ''
    : setting.codeinjection_head;
  return setting;
};
