read -p "Input name for your migration: " migrationName
npx typeorm-ts-node-commonjs migration:generate ./src/DB/postgres/migrations/"$migrationName" -d ./src/DB/postgres/data-source.ts