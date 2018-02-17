defmodule Memory.Game do
  def new do
    IO.puts "Made it to 'new' game"
    %{
      word: next_word(),
      guesses: [],
      clicks: 0,
      stepNumber: 0,
      locks: [],
    }
  end


  def client_view(game) do
    ws = String.graphemes(game.word)    # List of characters in the word
    gs = game.guesses                   # Current List of guesses
    len = length(gs)                    # Length of the list of guesses
    sn = game.stepNumber                # The stepnumber in the game
    cc = game.clicks                    # The click counter
    lk = game.locks                     # List of locked blocks
    gcc = findmatch(gs)                 # Returns the list of guesses in reverse

    # New section for last selected
    lasttwo = lastcouple(gcc)



    gfirst = firsto(gcc, len)           # Returns the first block number in the reverse list
    gsecond = secondo(gcc, len)         # Returns the second block number in reverse list
    word1 = findletter(ws, gfirst, len) # Returns the letter of first block number
    word2 = findletter(ws, gsecond, len) # Returns the letter of the second block number
    alter = altero(word1, word2, gfirst, gsecond, game.locks, len, game) # Supposed to return the list of locked characters
    newlk = game.locks

    # Seperates into the combing section
    chk = comb(gs)
    chklength = length(chk)
    listmatches = matchmaker(chk, chklength, ws)
    clickers = clickerss(lasttwo, len, listmatches)

    %{
      word: ws,
      steps: length(lk),
      clicks: length(gs),
      guess: gs,
      guesscorrected: findmatch(gs),
      guessfirst: firsto(gcc, len),
      guesssecond: secondo(gcc, len),
      chunked: chk,
      listofms: listmatches,
      lastcouples: lasttwo,
      locks: lk,
      newlocks: newlk,
      locks2: alter,
      wordOne: word1,
      wordTwo: word2,
      block1: skeleton(0, clickers),
      block2: skeleton(1, clickers),
      block3: skeleton(2, clickers),
      block4: skeleton(3, clickers),
      block5: skeleton(4, clickers),
      block6: skeleton(5, clickers),
      block7: skeleton(6, clickers),
      block8: skeleton(7, clickers),
      block9: skeleton(8, clickers),
      block10: skeleton(9, clickers),
      block11: skeleton(10, clickers),
      block12: skeleton(11, clickers),
      block13: skeleton(12, clickers),
      block14: skeleton(13, clickers),
      block15: skeleton(14, clickers),
      block16: skeleton(15, clickers),
      lock1: skeleton(0, listmatches),
      lock2: skeleton(1, listmatches),
      lock3: skeleton(2, listmatches),
      lock4: skeleton(3, listmatches),
      lock5: skeleton(4, listmatches),
      lock6: skeleton(5, listmatches),
      lock7: skeleton(6, listmatches),
      lock8: skeleton(7, listmatches),
      lock9: skeleton(8, listmatches),
      lock10: skeleton(9, listmatches),
      lock11: skeleton(10, listmatches),
      lock12: skeleton(11, listmatches),
      lock13: skeleton(12, listmatches),
      lock14: skeleton(13, listmatches),
      lock15: skeleton(14, listmatches),
      lock16: skeleton(15, listmatches),
    }
  end

  def lastcouple(list) do
    if (length(list) > 1) do
      y1 = Enum.at(list, 0)
      y2 = Enum.at(list, 1)
      Enum.concat([y1], [y2])
    else
      list
    end
  end

  def clickerss(last2, length, lockarray) do
    y1 = rem(length, 2)
    y2 = Enum.at(last2, 0)
    y3 = []
    y4 = [y2]
    if (y1 == 0) do
      y3
    else
      y4
    end
  end

  def matchmaker(combed, length, word) do
    y1 = Enum.filter(combed, fn(x) -> wishywashy(x, word) == 1 end)
    Enum.concat(y1)
  end

  def wishywashy(array, word) do
    y1 = Enum.at(array, 0)
    y2 = Enum.at(array, 1)
    letter1 = Enum.at(word, y1)
    letter2 = Enum.at(word, y2)
    if (letter1  == letter2) do
      1
    else
      0
    end
  end

  def matchingfun(array) do
    if (Enum.at(array, 0)  == Enum.at(array, 1)) do
      1
    else
      0
    end
  end

  def comb(guesses) do
    Enum.chunk_every(guesses, 2, 2, :discard)
  end

  def findmatch(guesses) do
    listo = guesses
    bisto = Enum.reverse(listo)
  end

  def addup(locks, add) do
    locks ++ add
  end

  def findletter(word, number, length) do
    if length > 1 do
      Enum.at(word, number)
    end
  end

  def firsto(guesses, length) do
    if length > 1 do
      Enum.at(guesses, 0)
    end
  end

  def secondo(guesses, length) do
    if length > 1 do
      Enum.at(guesses, 1)
    end
  end

  def altero(first, second, num1, num2, locks, length, game) do
    if length > 1 do
      if (first == second) do
        y = game.locks ++ [num1] ++ [num2]
        Map.put(game, :locks, y)
      else
        Map.put(game, :locks, game.locks)
      end
    else
      Map.put(game, :locks, game.locks)
    end
  end

  def skeleton(word, guesses) do
      if Enum.member?(guesses, word) do
        1
      else
        0
      end
  end


  def guess(game, number) do
    gs = game.guesses ++ [number]
    Map.put(game, :guesses, gs)
  end

  def reset(game) do
    y1 = length(game.guesses)
    gs = Enum.drop(game.guesses, y1)
    Map.put(game, :guesses, gs)
  end


  def next_word do
   words = ~w(
     ABCDEFGHABCDEFGH
   )
   Enum.random(words)
  end
end
