import { Box, Tabs, TextInput, FileButton, Button, Space, Textarea } from "#mc";
import { useDisclosure } from "#mh";
import { useForm } from "#mf";
import { useGetProfileQuery, useUpdateProfileMutation } from "#api/user";
import { useTranslation } from "#ri18n";

export default function () {
    const { t, i18n } = useTranslation();
    let arT = i18n.getFixedT("ar");
    let enT = i18n.getFixedT("en");
    const { data, isSuccess } = useGetProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            langs: {
                ar: { name: "", overview: "", bio: "", article: "" },
                en: { name: "", overview: "", bio: "", article: "" }
            }
        }
    });
    if (isSuccess) {
        let user = {
            langs: {
                ar: {
                    name: data.user.langs.ar.name,
                    overview: data.user.langs.ar.overview,
                    bio: data.user.langs.ar.bio,
                    article: data.user.langs.ar.article
                },
                en: {
                    name: data.user.langs.en.name,
                    overview: data.user.langs.en.overview,
                    bio: data.user.langs.en.bio,
                    article: data.user.langs.en.article
                }
            }
        };
        form.initialize(user);
    }
    function handleUpdateProfile() {
        updateProfile(form.getValues());
    }
    return (
        <Box>
            <Tabs defaultValue="ar">
                <Tabs.List>
                    <Tabs.Tab value="ar">العربية</Tabs.Tab>
                    <Tabs.Tab value="en">English</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel style={{ direction: "rtl" }} value="ar">
                    <TextInput
                        {...form.getInputProps("langs.ar.name")}
                        label={arT("name")}
                        placeholder={arT("enterHere")}
                    />
                    <Space h="sm" />
                    <TextInput
                        label={arT("article")}
                        placeholder={arT("enterHere")}
                        {...form.getInputProps("langs.ar.article")}
                    />
                    <Space h="sm" />
                    <Textarea
                        autosize
                        minRows={5}
                        maxRows={10}
                        label={arT("biography")}
                        placeholder={arT("enterHere")}
                        {...form.getInputProps("langs.ar.bio")}
                    />
                    <Space h="sm" />
                    <Textarea
                        autosize
                        minRows={5}
                        maxRows={10}
                        label={arT("overview")}
                        placeholder={arT("enterHere")}
                        {...form.getInputProps("langs.ar.overview")}
                    />
                    <Space h="xl" />
                </Tabs.Panel>

                <Tabs.Panel style={{ direction: "ltr" }} value="en">
                    <TextInput
                        {...form.getInputProps("langs.en.name")}
                        label={enT("name")}
                        placeholder={enT("enterHere")}
                    />
                    <Space h="sm" />
                    <TextInput
                        label={enT("article")}
                        placeholder={enT("enterHere")}
                        {...form.getInputProps("langs.en.article")}
                    />
                    <Space h="sm" />
                    <Textarea
                        autosize
                        minRows={5}
                        maxRows={10}
                        label={enT("biography")}
                        placeholder={enT("enterHere")}
                        {...form.getInputProps("langs.en.bio")}
                    />
                    <Space h="sm" />
                    <Textarea
                        autosize
                        minRows={5}
                        maxRows={10}
                        label={enT("overview")}
                        placeholder={enT("enterHere")}
                        {...form.getInputProps("langs.en.overview")}
                    />
                    <Space h="xl" />
                </Tabs.Panel>
            </Tabs>
            <Button onClick={handleUpdateProfile} fullWidth>
                {t("update")}
            </Button>
        </Box>
    );
}
