# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{pkgs, ... }:
  let firebase-ext = pkgs.fetchurl {
    url =
      "https://firebasestorage.googleapis.com/v0/b/firemat-preview-drop/o/vsix%2Ffirebase-vscode-0.2.0.vsix?alt=media&token=4f3eb6d9-8ec9-46d7-b051-9631f9bbc30e";
    hash = "sha256-GYqm7huYPJgDw8tVOIlpK/ObUnn3Z5jYh5lbtcZvjKE=";
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
    ];
    # Sets environment variables in the workspace
    env = {
        POSTGRESQL_CONN_STRING = "postgresql://user:mypassword@localhost:5432/dataconnect?sslmode=disable";
        FIRESQL_PORT = "9939";
    };

    processes = {
        postgresRun = {
          command = "postgres -D local -k /tmp";
        };
      };

    idx = {
      # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
      extensions = [
        "mtxr.sqltools-driver-pg"
        "mtxr.sqltools"
        "GraphQL.vscode-graphql-syntax"
        "${firebase-ext}"
        # "vscodevim.vim"
      ];
      workspace = {
        # Runs when a workspace is first created with this `dev.nix` file
        onCreate = {
          postgresSetup = ''
            mkdir -p ~/tripedia/local
            initdb -D ~/tripedia/local
            postgres -D ~/tripedia/local -k /tmp &
            sleep 4
            PGHOST=/tmp psql --dbname=postgres -c "ALTER USER \"user\" PASSWORD 'mypassword';"
            PGHOST=/tmp psql --dbname=postgres -c "CREATE DATABASE dataconnect;"
            PGHOST=/tmp psql --dbname=dataconnect -c "CREATE EXTENSION vector;"
          '';
          npm-install = ''
            npm install
          '';
          git-lfs-fetch = ''
            git lfs install
            git lfs pull
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
