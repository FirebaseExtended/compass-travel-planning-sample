# Compass Project Demo

This is a travel demo using Firebase Data Connect to find ideal itineraries from
a database of travel plans. To learn more about how this demo was created,
please see [this blog article](https://developers.googleblog.com/en/how-firebase-genkit-helped-add-ai-to-our-compass-app/).
To build a version of this demo for yourself with Firestore, [please see this
codelab](https://firebase.google.com/codelabs/ai-genkit-rag).

If you want to try out an early preview of Data Connect, we have instructions
below for you to follow!

> ⚠️ **WARNING** ⚠️
> You must be part of the [Firebase Data Connect Private Preview]((https://developers.google.com/profile/u/me/my-community/dataconnecteap))
> to run this app as emulator support is required.

# Try it out today!

We recommend trying this project in IDX since it handles all dependencies for
you. You are able to launch this project in IDX and get going testing with
only slight configuration required.

<a href="https://idx.google.com/import?url=https%3A%2F%2Fgithub.com%2FFirebaseExtended%2Fcompass-travel-planning-sample">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.idx.dev/btn/try_light_32.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.idx.dev/btn/try_dark_32.svg">
    <img height="32" alt="Try in IDX" src="https://cdn.idx.dev/btn/try_purple_32.svg">
  </picture>
</a>

## Getting Started

### Prerequisites

1. A new Firebase project.

1. Acceptance into the [Firebase Data Connect Private Preview](https://developers.google.com/profile/u/me/my-community/dataconnecteap)

1. [Activate billing on your Google Cloud / Firebase Project](https://console.cloud.google.com/billing/linkedaccount?project=_)

### Setup IDX

Then click the Open In IDX button above. Once the project is launched in IDX,
 please do the following:

1. Wait for the terminal tasks to finish running. The terminal tasks do things 
like initialize a PostgreSQL database for you, download the JSON files using git 
lfs, and install all the dependencies for the NextJS project. You can tell that 
the terminal tasks have been completed when the README.md appears as the main
editor window and the web preview for the NextJS app has appeared as well.

1. Next click on the Firebase side bar icon to open the Firebase side bar panel.

1. You will be prompted to trust the workspace. Check the box to `Allow the
workspace to access Google Cloud resources using my Google Account`. and click
`Continue`.

1. Login with your Google account

1. In the Firebase side panel, under the config window, click
`Sign in with Google` to specifically authenticate with Firebase CLI.

1. In the terminal window at the bottom of the screen, you should be prompted to
`Allow Firebase to collect CLI and Emulator Suite usand and error reporting
information`. You can select the default by pressing `enter` or you can deny by
entering a `n` and pressing `enter`.

1. You will see a prompt for visiting a URL like `https://auth.firebase.tools/login?code_challenge=abc...`. Go
and visit that URL to authenticate and paste the authorization code back into
the terminal.

1. Once you have finished authenticating with the Firebase CLI, click on
the `Connect a Firebase Project` button in the `Config` section of the Firebase
side bar.

1. Select the Firebase project you had previously created before launching this
project in IDX.

1. Click on the `Start Emulator` button in the Firebase side bar. **Note**: If
the emulators fail to start with a `403 unauthorized access` warning, please see
the prerequitsites about being accepted into the
[Firebase Data Connect Private Preview](https://developers.google.com/profile/u/me/my-community/dataconnecteap).

1. Launch a new terminal and run the following command:
    ```
    (cd loadData/ && node loadData.js)
    ```
    This will load all of our preview data into your local PostgreSQL instance.

1. Activate the Vertex AI API using the following command:
    ```
    gcloud services enable aiplatform.googleapis.com
    ```
    IDX will likely ask you to select the project you would like to use, so
select your Firebase project. This will allow your Firebase app to send calls
to models on Vertex AI and will enable charges for generating embeddings
and generating text responses from Gemini.

1. Hard restart your web app by clicking the drop down in the preview window
and selecting `Hard Restart` or by pressing `(CMD/CTRL) + SHIFT + P` to launch
the command palette and searching for `Project IDX: Hard Restart Previews`

1. Test and use the app as usual from the preview window.

This is not an officially supported Google product
