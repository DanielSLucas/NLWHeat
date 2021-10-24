defmodule ElixirHeatTags.Messages.Create do
  alias ElixirHeatTags.{Message, Repo}

  def call(params) do
    params
    |> Message.changeset()
    |> Repo.insert()
    |> handle_insert()
  end

  def handle_insert({:ok, %Message{}} = result), do: result
  def handle_insert({:error, result}), do: {:error, %{result: result, status: :bad_request}}
end
