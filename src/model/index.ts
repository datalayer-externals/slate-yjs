import { Range } from 'slate';
import * as Y from 'yjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SyncElement = Y.Map<any>;
export type SharedType = Y.Array<SyncElement>;
export type SyncNode = SharedType | SyncElement;

export const slateYjsOriginSymbol = Symbol(
  'Denotes that an event originated from slate-yjs'
);

export interface Cursor extends Range {
  data: {
    [key: string]: unknown;
  };
}

export const SyncElement = {
  getText(element: SyncElement): Y.Text | undefined {
    return element?.get('text');
  },

  getChildren(element: SyncElement): Y.Array<SyncElement> | undefined {
    return element?.get('children');
  },
};

export const SyncNode = {
  getChildren(node: SyncNode): Y.Array<SyncElement> | undefined {
    if (node instanceof Y.Array) {
      return node;
    }

    return SyncElement.getChildren(node);
  },

  getText(node: SyncNode): Y.Text | undefined {
    if (node instanceof Y.Array) {
      return undefined;
    }

    return SyncElement.getText(node);
  },
};
