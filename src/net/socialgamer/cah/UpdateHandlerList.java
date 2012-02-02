/**
 * Copyright (c) 2012, Andy Janata
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this list of conditions
 *   and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright notice, this list of
 *   conditions and the following disclaimer in the documentation and/or other materials provided
 *   with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package net.socialgamer.cah;

import java.io.File;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;


public class UpdateHandlerList {

  private static final List<String> EXCLUDE = Arrays.asList("AdminHandler", "GameHandler",
      "GameWithPlayerHandler", "Handler", "Handlers");

  /**
   * @param args
   */
  public static void main(final String[] args) throws Exception {
    final String dir = "src/net/socialgamer/cah/handlers/";
    final File outFile = new File(dir + "Handlers.java");
    assert outFile.canWrite();
    assert outFile.delete();
    assert outFile.createNewFile();
    final PrintWriter writer = new PrintWriter(outFile);

    writer.println("// This file is automatically generated. Do not edit.");
    writer.println("package net.socialgamer.cah.handlers;");
    writer.println();
    writer.println("import java.util.HashMap;");
    writer.println("import java.util.Map;");
    writer.println();
    writer.println();
    writer.println("public class Handlers {");
    writer.println("  public final static Map<String, Class<? extends Handler>> LIST;");
    writer.println();
    writer.println("  static {");
    writer.println("    LIST = new HashMap<String, Class<? extends Handler>>();");

    final File d = new File(dir);
    final File[] files = d.listFiles();
    for (final File f : files) {
      System.out.println(f.getName());
      final String fileName = f.getName().split("\\.")[0];
      if (EXCLUDE.contains(fileName) || !f.getName().split("\\.")[1].equals("java")) {
        continue;
      }
      writer.println("    LIST.put(" + fileName + ".OP, " + fileName + ".class);");
    }

    writer.println("  }");
    writer.println("}");
    writer.flush();
    writer.close();

  }
}

// package net.socialgamer.cah.handlers;
//
// import java.util.HashMap;
// import java.util.Map;
//
//
// public class Handlers {
// public final static Map<String, Class<? extends Handler>> LIST;
//
// static {
// LIST = new HashMap<String, Class<? extends Handler>>();
// LIST.put(new RegisterHandler().getOp(), RegisterHandler.class);
// }
// }
