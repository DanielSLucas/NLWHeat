defmodule ElixirHeatTags.Repo do
  use Ecto.Repo,
    otp_app: :elixir_heat_tags,
    adapter: Ecto.Adapters.Postgres
end
