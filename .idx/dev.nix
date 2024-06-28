# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{pkgs, ... }:
  let firebase-ext = pkgs.fetchurl {
    url =
      "https://firebasestorage.googleapis.com/v0/b/firemat-preview-drop/o/vsix%2Ffirebase-vscode-0.2.8.vsix?alt=media&token=ba272e6e-c6b3-4860-bc2a-cd5b9cd7e022";
    hash = "sha256-n4D70K61vThL3Tdjq1lq2Z/+4CBLtRj7ePY8uiv0taw=";
    name = "firebase.vsix";
  };
  in {
    # Which nixpkgs channel to use.
    channel = "stable-23.11"; # or "unstable"
    # Use https://search.nixos.org/packages to find packages
    packages = [
      (pkgs.postgresql_15.withPackages (p: [ p.pgvector ]))
      pkgs.nodejs_20
      pkgs.yarn
      pkgs.nodePackages.pnpm
      pkgs.bun
      pkgs.git-lfs
      pkgs.unzip
      pkgs.zip
    ];
    # Sets environment variables in the workspace
    env = {
      POSTGRESQL_CONN_STRING = "postgresql://user:mypassword@localhost:5432/dataconnect?sslmode=disable";
      FIRESQL_PORT = "9939";
      # Sets environment variables in the workspace
      # You can get a Gemini API key through the IDX Integrations panel to the left!
      GOOGLE_API_KEY = "REPLACE_ME_WITH_API_KEY";
    };

    processes = {
      postgresRun = {
        command = "postgres -D ./local -k /tmp";
      };
    };

    idx = {
      # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
      extensions = [
        "mtxr.sqltools-driver-pg"
        "mtxr.sqltools"
        "GraphQL.vscode-graphql-syntax"
        "${firebase-ext}"
      ];
      workspace = {
        # Runs when a workspace is first created with this `dev.nix` file
        onCreate = {
          npm-install = ''
            npm install
          '';
          git-lfs-fetch = ''
            git lfs install
            git lfs pull
            unzip local.zip -d .
          '';
        };
        onStart = {
        };
        # To run something each time the environment is rebuilt, use the `onStart` hook
      };
      
      # Enable previews and customize configuration
      previews = {
        enable = true;
        previews = {
          web = {
            command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
            manager = "web";
          };
        };
      };
    };
}
