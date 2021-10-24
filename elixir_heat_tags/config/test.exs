import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :elixir_heat_tags, ElixirHeatTags.Repo,
  username: "postgres",
  password: "docker",
  database: "elixir_heat_tags_test#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :elixir_heat_tags, ElixirHeatTagsWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "bwpHd54VGyJDMeKijjFmieW/u7r5eh1k6TyBDOIcjkCAs/vBhm+vM9zB8xgZhcBz",
  server: false

# In test we don't send emails.
config :elixir_heat_tags, ElixirHeatTags.Mailer, adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
