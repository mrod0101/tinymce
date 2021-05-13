import { Keys, UiFinder, Waiter } from '@ephox/agar';
import { describe, it } from '@ephox/bedrock-client';
import { TinyHooks, TinyUiActions } from '@ephox/mcagar';
import { SugarBody } from '@ephox/sugar';

import Editor from 'tinymce/core/api/Editor';
import Plugin from 'tinymce/plugins/preview/Plugin';
import Theme from 'tinymce/themes/silver/Theme';

describe('browser.tinymce.plugins.preview.PreviewSanityTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    plugins: 'preview',
    toolbar: 'preview',
    base_url: '/project/tinymce/js/tinymce'
  }, [ Theme, Plugin ]);

  const dialogSelector = 'div[role="dialog"]';
  const docBody = SugarBody.body();

  const pOpenDialog = async (editor: Editor) => {
    TinyUiActions.clickOnToolbar(editor, 'button');
    await TinyUiActions.pWaitForDialog(editor, '[role="dialog"] iframe');
  };

  it('TBA: Open dialog, click Close to close dialog', async () => {
    const editor = hook.editor();
    editor.setContent('<strong>a</strong>');
    await pOpenDialog(editor);
    TinyUiActions.closeDialog(editor);
    await Waiter.pTryUntil('Dialog should close', () => UiFinder.notExists(docBody, dialogSelector));

  });

  it('TBA: Open dialog, press escape to close dialog', async () => {
    const editor = hook.editor();
    editor.setContent('<strong>a</strong>');
    await pOpenDialog(editor);
    TinyUiActions.keydown(editor, Keys.escape());
    await Waiter.pTryUntil('Dialog should close on esc', () => UiFinder.notExists(docBody, dialogSelector));
  });
});
