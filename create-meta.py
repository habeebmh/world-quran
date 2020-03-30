import os
import re

out_file = open('./book/meta/translations.xml', 'w')

out_file.write('<meta>\n')

for file in sorted(os.listdir('./book/translations/')):
    translation = open('./book/translations/' + file, 'r')

    name = ''
    translator = ''
    language = ''
    uid = ''
    updated = ''

    for line in translation:
        if not str(line).startswith('#'):
            continue

        if str(line).startswith('#  Name:'):
            name = line.replace('#  Name:', '').strip()
        elif str(line).startswith('#  Translator:'):
            translator = line.replace('#  Translator:', '').strip()
        elif str(line).startswith('#  Language:'):
            language = line.replace('#  Language:', '').strip()
        elif str(line).startswith('#  ID:'):
            uid = line.replace('#  ID:', '').strip()
    if all(x is not '' for x in [name, translator, language, uid]):
        out_file.write('\t<translation id="{}" name="{}" translator="{}" language="{}" />\n'.format(uid, name.replace('&', 'and'), translator.replace('&', 'and'), language))

out_file.write('</meta>')
