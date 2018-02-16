import { announcePageLoaded } from 'grommet/utils/Announcer';
import React from 'react';
import Spinning from 'grommet/components/icons/Spinning';

import Status from 'grommet/components/icons/Status';
import RepairedIcon from 'grommet/components/icons/base/Compliance';

const DEFAULT_TITLE = 'MachineStream';

export function pageLoaded(title) {
  if (document) {
    if (title && typeof title === 'string') {
      title = `${title} | ${DEFAULT_TITLE}`;
    } else {
      title = DEFAULT_TITLE;
    }
    announcePageLoaded(title);
    document.title = title;
  }
}

export function getColorIndex(status) {
  switch (status) {
    case 'finished':
      return 'ok';
    case 'running':
      return 'warning';
    case 'errored':
      return 'critical';
    case 'repaired':
      return 'accent-1';
    default:
      return 'unknown';
  }
}

export function getStatusComponent(status) {
  switch (status) {
    case 'running':
      return <Spinning />;
    case 'finished':
      return <Status value='ok' />;
    case 'errored':
      return <Status value='critical' />;
    case 'repaired':
      return <RepairedIcon />;
    default:
      return <Status value='unknown' />;
  }
}

export default { pageLoaded, getColorIndex, getStatusComponent };
